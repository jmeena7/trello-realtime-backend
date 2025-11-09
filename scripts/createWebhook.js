import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
const BOARD_ID = "690f99c1bf1a72852aef0e6d";  // aapka board ID
const CALLBACK_URL = "https://encephalographically-superexplicit-helene.ngrok-free.dev/webhook"; // aapka ngrok URL

async function createWebhook() {
  try {
    const res = await axios.post(
      `https://api.trello.com/1/webhooks/?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`,
      {
        description: "Realtime Trello Webhook",
        callbackURL: CALLBACK_URL,
        idModel: BOARD_ID,
        active: true
      }
    );
    console.log("Webhook created:", res.data);
  } catch (err) {
    console.error("Webhook creation error:", err.response?.data || err.message);
  }
}

createWebhook();
