import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  connect(process.env.MONGODB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions).then(
    () => console.log("Connected to Database successful"),
    (error) => console.log(`Database connection Faild ${error}`)
  );
};
