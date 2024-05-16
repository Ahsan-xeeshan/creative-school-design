const classSchema = require("../models/classSchema");
const purchasedClassSchema = require("../models/PurchasedClass");

async function createClassController(req, res) {
  try {
    // Destructuring class properties from the request body
    const {
      instructorname,
      email,
      classname,
      price,
      quantity,
      image,
      category,
      instructorid,
    } = req.body;

    // Creating a new instance of the classSchema model with the received data
    const classData = new classSchema({
      instructorname,
      email,
      instructorid,
      image,
      classname,
      price,
      category,
      quantity,
    });

    // Saving the new class data to the database
    await classData.save();

    // Sending a success response back to the client with status code 201 (Created)
    res.status(201).json({ success: "Class created successfully" });
  } catch (error) {
    // Handling any errors that occur during the save operation
    console.error("Error creating class:", error);
    res.status(500).json({ error: "Failed to create class" });
  }
}

async function updateClassController(req, res) {
  try {
    const classId = req.params.id;

    let existingClass = await classSchema.findById(classId);

    if (!existingClass) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Update class properties with data from request body
    existingClass.instructorname = req.body.instructorname;
    existingClass.email = req.body.email;
    existingClass.classname = req.body.classname;
    existingClass.price = req.body.price;
    existingClass.quantity = req.body.quantity;
    existingClass.image = req.body.image;
    existingClass.category = req.body.category;
    existingClass.instructorid = req.body.instructorid;

    // Save the updated class data
    await existingClass.save();

    // Sending a success response back to the client
    res.status(200).json({ success: "Class updated successfully" });
  } catch (error) {
    // Handling any errors that occur during the update operation
    console.error("Error updating class:", error);
    res.status(500).json({ error: "Failed to update class" });
  }
}

async function allClassController(req, res) {
  let data = await classSchema.find({});
  return res.json(data);
}

async function deleteClassController(req, res) {
  try {
    const { id } = req.body;
    const data = await classSchema.deleteOne({ _id: id });
    if (!data) {
      return res.status(404).send({ error: "Class not found" });
    }
    res.send({ success: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).send({ error: "Internal server error" });
  }
}

async function updateFeedbackController(req, res) {
  const { id, feedback } = req.body;
  try {
    const updateFeedback = await classSchema.findByIdAndUpdate(
      id,
      { feedback: feedback },
      { new: true }
    );

    if (!updateFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json(updateFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function classAcceptController(req, res) {
  const { id } = req.body;
  const updateStatus = await classSchema.findByIdAndUpdate(
    { _id: id },
    { status: "accept" },
    { new: true }
  );
  res.json(updateStatus);
}

async function classRejectController(req, res) {
  const { id } = req.body;
  const updateStatus = await classSchema.findByIdAndUpdate(
    { _id: id },
    { status: "reject" },
    { new: true }
  );
  res.json(updateStatus);
}

async function classPurchaseController(req, res) {
  try {
    const { classname, price, image, buyerId, courseId } = req.body;

    const purchaseData = new purchasedClassSchema({
      classname,
      price,
      image,
      buyerId,
      courseId,
    });

    await purchaseData.save();

    await classSchema.findOneAndUpdate(
      { _id: courseId },
      { $push: { classSelector: buyerId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Purchase successful",
      classname,
      price,
      image,
      courseId,
    });
  } catch (error) {
    console.error("Error in class purchase:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

async function selectedClassesController(req, res) {
  try {
    const { buyerId } = req.query;

    const classes = await purchasedClassSchema.find({ buyerId: buyerId });

    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: "No class found" });
    }

    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteSelectionController(req, res) {
  try {
    const { id } = req.body;
    const dataToDelete = await purchasedClassSchema.findById(id);

    const data = await purchasedClassSchema.deleteOne({ _id: id });
    await classSchema.findOneAndUpdate(
      { _id: dataToDelete.courseId },
      { $pull: { classSelector: dataToDelete.buyerId } },
      { new: true }
    );

    if (!data) {
      return res.status(404).send({ error: "Class not found" });
    }
    res.send({ success: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).send({ error: "Internal server error" });
  }
}

module.exports = {
  createClassController,
  allClassController,
  deleteClassController,
  updateFeedbackController,
  classAcceptController,
  classRejectController,
  updateClassController,
  classPurchaseController,
  selectedClassesController,
  deleteSelectionController,
};
