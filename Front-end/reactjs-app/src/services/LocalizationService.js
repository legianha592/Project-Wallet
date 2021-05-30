// ES6 module syntax
import LocalizedStrings from "react-localization";

const LANGUAGE = "LANGUAGE";

export const strings = new LocalizedStrings({
  en: {
    vietnamese: "Vietnamese",
    english: "English",
    income: "Income",
    outcome: "Outcome",
    create_record: "Create Record",
    create_wallet: "Create Wallet",
    records: "Records",
    wallets: "Wallets",
    logout: "Logout",
    update: "Update",
    delete: "Delete",
    record_title: "Title",
    record_note: "Note",
    record_date: "Date",
    record_amount: "Amount",
    pick_type_record: "Pick type record",
    add_new_type_record: "Add new Type Record",
    title_create_type_record: "Create Type Record",
    type_record_name: "Type record name",
    cancel_button: "Cancel",
    create_button: "Create",
    total_amount: "Total amount: $ {0}",
    wallet_name: "Wallet Name",
    update_button: "Update",
    update_wallet: "Update Wallet",
    update_record: "Update Record",
  },
  vn: {
    vietnamese: "Tiếng Việt",
    english: "Tiếng Anh",
    income: "Tiền vào",
    outcome: "Tiền ra",
    create_record: "Tạo bản ghi",
    create_wallet: "Tạo ví",
    records: "Danh sách bản ghi",
    wallets: "Danh sách ví",
    logout: "Đăng xuất",
    update: "Chỉnh sửa",
    delete: "Xoá",
    record_title: "Tiêu đề",
    record_note: "Ghi chú",
    record_date: "Ngày",
    record_amount: "Số tiền",
    pick_type_record: "Chọn loại bản ghi",
    add_new_type_record: "Tạo loại bản ghi mới",
    title_create_type_record: "Tạo loại bản ghi mới",
    type_record_name: "Tên loại bản ghi",
    cancel_button: "Huỷ bỏ",
    create_button: "Tạo",
    total_amount: "Tổng số tiền: {0} VND",
    wallet_name: "Tên ví",
    update_button: "Sửa",
    update_wallet: "Chỉnh sửa ví",
    update_record: "Chỉnh sửa bản ghi",
  },
});

export function onSetLanguageToVietNamese() {
  strings.setLanguage("vn");
  localStorage.setItem(LANGUAGE, "vn");
}

export async function onSetLanguageToEnglish() {
  strings.setLanguage("en");
  localStorage.setItem(LANGUAGE, "en");
}

export async function getCurrentLanguage() {
  let language = localStorage.getItem(LANGUAGE) ?? "en";
  console.log("current language: ", language);
  strings.setLanguage(language);
}
