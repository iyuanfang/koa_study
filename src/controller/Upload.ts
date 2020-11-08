import multer from "koa-multer";

export const fileUploadOptions = {
  storage: multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
      cb(null, "./static/img/");
    },
    filename: (req: any, file: any, cb: any) => {
      let type = file.originalname.split(".")[1];
      cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
    },
  }),
};



