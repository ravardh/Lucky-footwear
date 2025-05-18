import cloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";

export const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      mrp,
      discount,
      description,
      category,
      subCategory,
      rating,
      color,
      size,
      brand,
    } = req.body;

    // Upload images to Cloudinary and get only secure URLs
    const uploadPromises = req.files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "LuckyFootwear/products",
        width: 800,
        height: 800,
        crop: "fill",
        quality: "auto",
      });

      return result.secure_url;
    });

    const uploadedImageUrls = await Promise.all(uploadPromises);

    const Stock = JSON.parse(size);

    const newProduct = await Product.create({
      name,
      mrp,
      discount,
      description,
      category,
      subCategory,
      rating,
      color,
      size: Stock,
      brand,
      image: uploadedImageUrls,
      status: "active",
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Product creation error:", error);
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Product fetching error:", error);
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  console.log("getProductById");
};

export const updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      mrp,
      discount,
      description,
      category,
      subCategory,
      rating,
      color,
      size,
      brand,
    } = req.body;

    const productID = req.params.id;
    const existingProduct = await Product.findById(productID);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (req.files.length > 0) {
      console.log(existingProduct.image);
      existingProduct.image.map(async (img) => {
        const imgId = img.split("/upload/")[1].split("/");
        const public_id =
          imgId[1] + "/" + imgId[2] + "/" + imgId[3].split(".")[0];
        try {
          const res = await cloudinary.uploader.destroy(public_id);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      });
      existingProduct.image = [];
    }

    // Upload images to Cloudinary and get only secure URLs
    const uploadPromises = req.files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "LuckyFootwear/products",
        width: 800,
        height: 800,
        crop: "fill",
        quality: "auto",
      });

      return result.secure_url;
    });

    const uploadedImageUrls = await Promise.all(uploadPromises);
    console.log(uploadedImageUrls);
    const Stock = JSON.parse(size);

    const newProduct = await Product.findByIdAndUpdate(
      productID,
      {
        name,
        mrp,
        discount,
        description,
        category,
        subCategory,
        rating,
        color,
        size: Stock,
        brand,
        image: uploadedImageUrls,
        status: "active",
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Product creation error:", error);
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  console.log("deleteProduct");
};
