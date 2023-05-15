const app = require("../server");
require("../config/mongodb");
const port = process.env.PORT || 8000
app.listen(port, () =>
    console.log(`Port Is Running Successfully at ${port}`)
);