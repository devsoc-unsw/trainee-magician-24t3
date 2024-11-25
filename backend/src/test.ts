import axios from "axios";
import "dotenv/config";

axios.get(`http://localhost:${process.env.LDPT_PORT}/user/3`).then((res) => {
  console.log(res.data);
});
