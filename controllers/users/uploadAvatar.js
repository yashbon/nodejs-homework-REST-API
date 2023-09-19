const fs = require("fs/promises");
const path = require("path");
const avatarsDir = path.join(__dirname, "..", "public", "avatars");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const uploadAvatar = async (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    const idUser = req.user._id;
    const filename = `${idUser}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await Jimp.read(tempUpload)
        .then((file) => {
            return (
                file
                    .cover(250, 250) // resize
                    // .quality(60) // set JPEG quality
                    // .greyscale() // set greyscale
                    .write(tempUpload)
            ); // save
        })
        .catch((err) => {
            console.error(err);
        });

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(idUser, { avatarURL });

    res.json({ avatarURL });
};

module.exports = uploadAvatar;
