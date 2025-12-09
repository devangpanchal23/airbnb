# Airbnb Clone

An Airbnb-like rental listing application built with Node.js, Express, MongoDB, and EJS. This project allows users to create, view, edit, and delete rental listings, mimicking the core functionality of Airbnb.

## Features

- **CRUD Operations**: Create, read, update, and delete rental listings.
- **Data Validation**: Uses Joi for input validation to ensure data integrity.
- **Error Handling**: Custom error handling middleware for better user experience.
- **Responsive UI**: Built with EJS templates for dynamic rendering.
- **MongoDB Integration**: Stores listing data in a MongoDB database.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS (Embedded JavaScript Templates), ejs-mate for layout support
- **Validation**: Joi
- **Utilities**: method-override for HTTP method support

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/devangpanchal23/airbnb.git
   cd airbnb
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MongoDB**:
   - Ensure MongoDB is installed and running on your local machine.
   - The default connection URL is `mongodb://127.0.0.1:27017/wanderlust`. Update `MONGO_URL` in `app.js` if needed.

4. **Start the server**:
   ```bash
   node app.js
   ```

   The server will run on `http://localhost:8085`.

## Usage

- **Home Page**: Visit `http://localhost:8085/` for the home page.
- **View Listings**: Navigate to `/listings` to see all available listings.
- **Create Listing**: Go to `/listings/new` to add a new listing.
- **Edit Listing**: Access `/listings/:id/edit` to edit an existing listing.
- **Delete Listing**: Use the delete functionality on individual listing pages.

## Project Structure

```
airbnb/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── schema.js              # Joi validation schemas
├── models/
│   └── listing.js         # Mongoose model for listings
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Base layout template
│   ├── includes/
│   │   ├── navbar.ejs     # Navigation bar
│   │   └── footer.ejs     # Footer
│   └── listings/
│       ├── index.ejs      # List all listings
│       ├── show.ejs       # Show single listing
│       ├── new.ejs        # Form to create new listing
│       └── edit.ejs       # Form to edit listing
├── public/
│   ├── css/
│   │   └── style.css      # Stylesheets
│   └── js/
│       └── script.js      # Client-side scripts
├── utils/
│   ├── ExpressError.js    # Custom error class
│   └── wrapAsync.js       # Async error wrapper
└── init/
    ├── data.js            # Sample data
    └── index.js           # Initialization script
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the ISC License.
