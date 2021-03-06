
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mysql = require('mysql');
const favicon = require('serve-favicon');
const path = require('path');


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded
  ({
  extended: true
  }));

app.use(express.static("public"));


// use the favicon in /public folder -
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Empty blogPosts Array
const blogPosts = [];


//const footer = require (__dirname + "/footer.ejs");
//const header = require (__dirname + "/header.ejs");

const homeStartingContent = "Lacus ve facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const resumeContent = " If you made it this far you should contact me!";
const blogStartingContent = " Theres nothing really here just yet other than the super bare bones of an EJS NODE EXPRESS app connected to a MYSQL database with some simple blog and user table structures I'm working on, it will get proper authentication, comments and some other stuff as I shake the rust off of the programming skills and build out some new practice modules.   I just crashed this whole site togther over the last few days of April 2019 to find some new work in the Baltimore/DC metro area, where I have recently relocated to, and I haven't had very much time to actually generate and populate any really great or coherent content.  So this is the current state of a blog that will get some attention shortly.  I also created all the graphics and have started to sort through the last decades worth of photos from living and working in California and else where."   




// // Create MySQL DATABASE connection
// let connection = mysql.createConnection({
//   host: 'localhost',
//   database: 'billytheschmidt',
//   user: 'root',
//   password: '4539'
// });

// // CONNECT and LOG ERRORS or The connection success
// connection.connect(function (err) {
//   if (err) {
//     return console.error('error: ' + err.message);
//   }
//   console.log('Connected to the MySQL server.');
// });



app.get("/", function (req, res) {
  res.render("home", {
    homePara: homeStartingContent,

  });
});

app.get("/resume", function (req, res) {
  res.render("resume", {
    resumePara: resumeContent

  });
});

app.get("/portfolio", function (req, res) {
  // res.render("portfolio", {
  //   homePara: homeStartingContent,

  // });

  res.sendFile(path.join(__dirname + '/public/html','portfolio.html'));
});

app.get("/blog", function (req, res) {
  res.render("blog", {
    blogPara: blogStartingContent,
    newBlogPosts: blogPosts
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    aboutPara: aboutContent
  });
});

app.get("/contact", function (req, res) {
  // res.render("contact", {
  //   contactPara: contactContent
  // });

  res.sendFile(path.join(__dirname + '/public/html','contact.html'));
});

// Work on the comepose area later --->

// app.get("/compose", function (req, res) {
//   res.render("compose");
//   //  console.log(req.body);

// });

// app.post("/compose", function (req, res) 
// {
//   const post = 
//   { /// where we push posts to our posts array
//     title: req.body.postTitle, /// post has a title
//     post_text: req.body.postBody /// post has content
//   };
  
//   /// pushes the new post into blogPost array
//   blogPosts.push(post); 

//   console.log(post);

//   const insert_post = "INSERT INTO posts SET ?";

//    connection.query(insert_post, post, function(err,result){
//           if(err) 
//         {
//          console.log(err);
//         } 
//          else 
//         {
//          obj = JSON.parse(JSON.stringify(post));
//         {
//         // redirect to home page
//           res.redirect("/blog");
//         }
//       }
//     });
// });


app.get("/posts/:postName", function (req, res) { /// search through posts

  const requestTitle = _.lowerCase(req.params.postName); // stores new post name in requestTitle

  blogPosts.forEach(function (blogpost) { // loops through the entire post array to look for the requested title
    const storedTitle = _.lowerCase(blogpost.title); // stores each array title in storedTitle

    if (storedTitle === requestTitle) { // compares current array title to the requested title
      //console.log(post.title, post.content);
      res.render("post", {
        blogTitle: blogpost.title,
        blogContent: blogpost.content

      });

    }

  });

});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
