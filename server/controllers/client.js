const Product = require("../models/Product");
const User = require("../models/User");
const ProductsStat = require("../models/ProductStat");
const Transaction = require("../models/Transaction");
const getCountryIso3 = require("country-iso-2-to-3");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductsStat.find({
          productId: product._id,
        });
        //combining all the product info witrh the stat info and sending
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ msg: "error" });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");

    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ msg: "error" });
  }
};

const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((accumulator, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!accumulator[countryISO3]) {
        accumulator[countryISO3] = 0;
      }
      accumulator[countryISO3]++;
      return accumulator;
    }, {});

    const formattedLocation = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json(formattedLocation);
  } catch (error) {
    res.status(404).json({ msg: "error" });
  }
};
module.exports = { getProducts, getCustomers, getTransactions, getGeography };
