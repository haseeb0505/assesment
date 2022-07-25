const router = require("express").Router();

const Message = require("../models/Message");
const verify = require("../verifyToken");


// add 
router.post("/", verify, async (req, res) => {
    const newMessage = new Message(req.body);

    try {
        const Savedmessage = await newMessage.save();
        res.status(201).json(Savedmessage);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

// get 
router.get("/:conversationId", verify, async (req, res) => {

    try {
        const allmessages = await Message.find({ conversationId: req.params.conversationId });
        res.status(200).json(allmessages);
        console.log(allmessages);
    } catch (error) {
        res.status(500).json({ message: error });
    }
})



module.exports = router;