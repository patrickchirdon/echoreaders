const Ebook = require("../models/Ebook");
const ITEMS_PER_PAGE = 3;

function trimString(passedString) {
  var theString = passedString.substring(0, 150);
  return theString;
}

exports.getHome = (req, res) => {
  const page = +req.query.page || 1;
  let totalItems;
  // var ebooks = Ebook.find();

  Ebook.find({ isApproved: "YES" })
    .countDocuments()
    .then((numEbooks) => {
      totalItems = numEbooks;
      return Ebook.find({ isApproved: "YES" })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((ebooks) => {
      res.render("home", {
        ebooks: ebooks,
        ebookcover: ebooks.ebookcover,
        name: req.user.name,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getEbook = (req, res) => {
  const ebookId = req.params.id;
  Ebook.findById(ebookId)
    .then((ebook) => {
      res.render("ebook", {
        ebook: ebook,
        name: req.user.name,
      });
    })
    .catch((err) => {
      throw err;
    });
};
