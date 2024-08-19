const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Metadata info about the API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Store API", version: "1.0.0"}
  },
  apis: ["v1/routes/index.js"]
};

// Docs in JSON Format
const swaggerSpec = swaggerJSDoc(options);

// Funtions to setup the docs

const swaggerDocs = (app) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = { swaggerDocs };
