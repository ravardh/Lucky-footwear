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
      stock,
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
    console.log(uploadedImageUrls);
    const Stock = JSON.parse(size);
    const newProduct = new Product({
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
    });

    await newProduct.save();

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
  console.log("updateProduct");
};

export const deleteProduct = async (req, res, next) => {
  console.log("deleteProduct");
};
