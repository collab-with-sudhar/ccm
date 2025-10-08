import express from "express";
import multer from "multer";
import { Dropbox } from "dropbox";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const dbx = new Dropbox({ accessToken: "sl.u.AGDmI_sO0mU9W54og0xX7hY-X8Yswfxtxs7uMcujQ0D7ecoF0ZaW3ZnMcLb83r9Ex_QCZVIik1aD0WVNBGOZafxog76WJB5fgWgr_YOI-_qyMDXPP0j17VDLicQBYm47m9GAEV9Ikf67UYntiLPYc6Xijo_xrb-VsG-shlIjtqqrnL4B5ST16BbpvDBKNwEsdyCFenQnLtXwZ_PmpvqpgKru8Ipf5or9o7qNvOI7qDlYTzs_AMVdjUE1KzwhzZ73s6WSHjmLK79jxdWq7k3aoQ0CEdDoHspkhmlE89OMPSMDXytZ1rxMNIOjaG1VSlt0uaVzhI_3oyxlsIPM1JsZYX6KnSHYVJCE4AzmiPFBSMvNGpq2qSrZxmE9YQ7XPqVX4L2K8YIZjD6xt1VxtyuIba_u3XS7hWomOB3HM7j4IlmB7BA9AhZlXk4UXDi87MmBS4PPJHCo1lcdM8vaTgc8NoniWBonr4xXEh55mN_VOAJ32UIsu3libcceEymp1JDyb-1WQiOui-UgzrfAfTKNn2iWZ1OzDZrq4CUtD91TgAP4dNWLg8_lctLpEuElpWgBxSlN2vn5jwQ2qLglO_udTZJTzgF5n7t9LCCZ50cxpnlvKkz-RNVNH2f2iFrXU2nrrQXwJx49xxRMHhOiktU0jLYiVK0mhwm-EgeFHNH3Zw5dKrrUfiW1aOBLig8KozwQ21reEWU_X4CwquRNe_CtiOG--M0GOpVeqZ4aQN6BSwQoOEM6bkQKUJ-N684w1fuqhKO4PdI_Hs0qGFgC0gQru6k7wzs0Jw0tdS-oKZOUUPHAAyi6OBbttaw1wWYhFZvtxCpYndTSarb_fxgad5RIn6a4-wBZm8UHsYhlMjuiGFzPRdgM7Rp5YYj2-G-lxOKZW4hhQqufEQ_CLWDyfZfX5zQyr3mtCuMD4sIHO3pRDxNmMoWazjNOTDj44ZuMe5evBL0CBdDISGTiu8-YAdid3nk45t9UFiiMxi9oTLB55KC4VkeuiIm74udOx9zBwMAEvqum9xSSzRqbP6t8x9c0zlbEMGtnld8K-CqVK9yQ1va5wJRaa6douljR5jBAeVq02Hif2F_5FuvVUOLrJmpIone2S37lXew1UzhwzuvrpAaNKGflIigdF0IeUv4ob0xlSsMi9vvrRzTSYNn4cdxlSlNPTobCVGTc3byBxwm6aaB6LMsryKMKIWN38-3Qa07CogSlZRuqk9alVik8dp-FnMjmU96tuNi15QIuqgE4OLbrSMnn-q3mv4RldLcurJ26wYNueUPIZkPZh1Ry7tdIy3EdKr1TW_ZoRg3UPCU8tYNN38LDjZJmAW8qdpch5i6qphkfge3Zk8eeE7lQ4wGZmyNcdsYYcT4wRkJ2wxn2kvfLkvTLEUNq-hHCbrQYJi3Kih0WmizuWtvWKY2YkUTM6VbHw9wNnfZwh_UgfOON2UZ0ew" });
console.log(process.env.DROPBOX_ACCESS_TOKEN)

// ✅ Upload file to Dropbox
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = fs.readFileSync(req.file.path);
    await dbx.filesUpload({
      path: "/" + req.file.originalname,
      contents: file,
      mode: "overwrite",
    });
    fs.unlinkSync(req.file.path);
    res.json({ message: "File uploaded to Dropbox successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ✅ List all files in Dropbox
router.get("/list", async (req, res) => {
  try {
    const response = await dbx.filesListFolder({ path: "" });
    const files = response.result.entries.map((file) => file.name);
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list files" });
  }
});

// ✅ Download file from Dropbox
router.get("/download/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const response = await dbx.filesDownload({ path: "/" + filename });

    fs.writeFileSync(filename, response.result.fileBinary, "binary");
    res.download(filename, () => fs.unlinkSync(filename));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Download failed" });
  }
});

export default router;
