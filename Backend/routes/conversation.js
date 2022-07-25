const router = require("express").Router();

const Conversation = require("../models/Conversation");
const verify = require("../verifyToken");

// new conversions
router.post("/", async (req, res) => {

    const conversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await conversation.save()
        res.status(201).json(savedConversation)
    } catch (error) {
        res.status(500).json({ message: error });
    }
})
//  get conversation of user 

router.get("/:userId", verify, async (req, res) => {

    try {
        const conversation = await Conversation.find({ members: { $in: [req.params.userId] } })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

// get con includes two user id 

router.get("/find/:userId1/:userId2", verify, async (req, res) => {

    try {
        const conversation = await Conversation.findOne({ members: { $all: [req.params.userId1, req.params.userId2] } })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({ message: error });
    }



})





module.exports = router;