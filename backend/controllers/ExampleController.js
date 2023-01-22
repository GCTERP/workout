import ExampleModel from "../models/ExampleModel.js"

// GET: Something
export const getSomething = async (req, res) => {

    try {

        // Any declarations or initialization
        let { name, age } = { ...req.body }

        // Preprocessing
        if(name == "")
            res.status(400).send('Request Failed: ' + 'Name Field Is Empty')

        // Data CRUD
        let result = await ExampleModel.find({ name: name })

        // Process Result
        result = result.filter(val => val != "")

        // Response
        res.status(200).json(result)

    }   catch(err) { res.status(400).send('Request Failed: ' + err.message) }
}