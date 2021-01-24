
const db = Mongoose("mongodb://localhost:3000", { useNewUrlParser: true, useUnifiedTopology: true });
const categorySchema = new Mongoose.Schema({
    categoryName: String,
    categoryDes: String,
    categoryImg: String,
    // categoryId: Mongoose.Schema.types.objectId
});
const bookSchema = new Mongoose.Schema({
    title:String,
    author:String,
    bookDes:String,
    bookImg:String,
    totalBook:Number,
    issuedBook:Number,
    issueDate:Date,
    submissionDate:Date,
    duration:Number,
    bookId:Mongoose.Schema.types.objectId
});
const bookModel = db.model('book', bookSchema);
const categoryModel = db.model('category', categorySchema);
app.post('/categories/book', async (req, res) => {
  const {title,author,totalBook,issuedBook,bookDes,bookImg,issueDate,submissionDate,duration,bookId} = req.body;
  const existingBook = await bookModel.findOne({ bookId});
    if (isNullOrUndefined(existingBook)) {
        // const hashedPwd = bcrypt.hashSync(password, SALT);
        const newBook = new bookModel({title,author,totalBook,issuedBook,bookDes,bookImg,issueDate,submissionDate,duration,bookId});
        await newBook.save();
        res.status(201).send({success:'book added'});
    } else {
        res.status(400).send({ err: 'book already exists.' });
    }
});
app.post('/categories',async (req, res) => {
    const {categoryName,categoryDes,categoryImg} = req.body;
    const existingCategory = await  categoryModel.findOne({categoryName});
    if(isNullOrUndefined(existingCategory)){
        const newCategory = new categoryModel
    }
});