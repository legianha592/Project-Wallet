import { WALLET_ROOT_URL } from "../utils/constants";
import { getUser, isLoggedIn } from "../utils/UserManager";
import axios from "axios";
import { toastError, toastSuccess } from "../utils/ToastManager";

export default function WalletService() {}

export async function getWallets() {
  const user = await getUser();
  console.log("user in wallet service", user);
  const isLogin = await isLoggedIn();
  if (!isLogin) {
    return;
  } else {
    const res = await fetch(`${WALLET_ROOT_URL}/list?userId=${user.id}`);
    const data = await res.json();
    if (data.result != null) {
      return data.result.list_wallet;
    }
    return;
  }
}

export async function addWallet(walletName) {
  var wallet = {};
  let user = await getUser();
  wallet.user_id = user.id;
  wallet.wallet_name = walletName;
  console.log(wallet);
  let response = await axios.post(WALLET_ROOT_URL + "/create", wallet);
  console.log(response.data);
  if (response.data.result != null) {
    wallet.id = response.data.result.wallet_id;
    toastSuccess("Success create wallet");
    return wallet;
  } else if (response.data.message != null) {
    toastError(response.data.message);
  }
  return null;
}

export async function updateWallet(wallet) {
  console.log(wallet);
  let response = await axios.put(WALLET_ROOT_URL + "/update", wallet);
  console.log(response.data);
  if (response.data.result != null) {
    toastSuccess("Success update wallet");
    return wallet;
  } else if (response.data.message != null) {
    toastError(response.data.message);
  }
  return null;
}

export async function deleteWallet(wallet_id) {
  console.log(wallet_id);
  let response = await axios.delete(`${WALLET_ROOT_URL}/delete`, {
    data: {
      wallet_id: wallet_id,
    },
  });
  if (response.data.result != null) {
    toastSuccess("Success delete wallet");
    return true;
  } else {
    toastError(response.data.message);
    return false;
  }
}
