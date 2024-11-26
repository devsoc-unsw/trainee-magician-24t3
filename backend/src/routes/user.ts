import { Router } from "express";

const userRouter = Router();

userRouter.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.send({
    id: req.params.id,
  });
});

export default userRouter;
