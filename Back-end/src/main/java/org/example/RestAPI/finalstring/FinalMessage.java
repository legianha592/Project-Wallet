package org.example.RestAPI.finalstring;

public class FinalMessage {
    //Cookie
    public static final String LOGIN_COOKIE = "logincookie";
    //Đăng kí
    public static final String SIGNUP_SUCCESS = "Đăng kí thành công";
    public static final String INVALID_USERNAME_LENGTH = "Độ dài tên không hợp lệ";
    public static final String INVALID_USERNAME_VALUE = "Tên chứa kí tự không hợp lệ";
    public static final String INVALID_PASSWORD_LENGTH = "Độ dài mật khẩu không hợp lệ";
    public static final String INVALID_PASSWORD_VALUE = "Mật khẩu chứa kí tự không hợp lệ";
    public static final String INVALID_NEW_PASSWORD_LENGTH = "Độ dài mật khẩu mới không hợp lệ";
    public static final String INVALID_NEW_PASSWORD_VALUE = "Mật khẩu mới chứa kí tự không hợp lệ";
    public static final String CHANGE_PASSWORD_SUCCESS = "Đổi mật khẩu thành công";
    public static final String USERNAME_EXISTED = "Tên đăng kí đã tồn tại";
    public static final String CONFIRM_FAIL = "Hai chuỗi mật khẩu không giống nhau";
    //Đăng nhập
    public static final String LOGIN_SUCCESS = "Đăng nhập thành công";
    public static final String NO_USER = "Không tồn tại người dùng";


    //Tạo ví
    public static final String WRONG_PASSWORD = "Sai mật khẩu";
    public static final String CREATE_WALLET_SUCCESS = "Tạo ví thành công";
    public static final String NO_WALLET = "Không tồn tại ví";
    public static final String INVALID_WALLET_NAME_LENGTH = "Độ dài của tên ví không hợp lệ";
    public static final String INVALID_NEW_WALLET_NAME_LENGTH = "Độ dài của tên ví mới không hợp lệ";
    //Update ví
    public static final String CHANGE_WALLET_NAME_SUCCESS = "Đổi tên ví thành công";
    //Xóa ví
    public static final String DELETE_WALLET_SUCCESS = "Xóa ví thành công";
    //Lấy danh sách ví theo user id
    public static final String GET_LIST_WALLET_SUCCESS = "Lấy danh sách ví thành công";



    //Tạo record
    public static final String INVALID_TITLE_RECORD_LENGTH = "Độ dài tiêu đề bản ghi không hợp lệ";
    public static final String INVALID_NOTE_RECORD_LENGTH = "Độ dài nội dung bản ghi không hợp lệ";
    public static final String CREATE_RECORD_SUCCESS = "Tạo bản ghi thành công";
    //Update record
    public static final String NO_RECORD = "Không tồn tại bản ghi";
    public static final String UPDATE_RECORD_SUCCESS = "Cập nhật bản ghi thành công";
    //lấy danh sách record theo wallet id
    public static final String GET_LIST_RECORD_SUCCESS = "Lấy danh sách bản ghi thành công";
    //Xóa record
    public static final String DELETE_RECORD_SUCCESS = "Xóa bản ghi thành công";



    //Tạo type record
    public static final String INVALID_TYPERECORD_NAME_LENGTH = "Độ dài của phân loại bản ghi không hợp lệ";
    public static final String TYPERECORD_EXISTED = "Phân loại bản ghi đã tồn tại";
    public static final String CREATE_TYPERECORD_SUCCESS = "Tạo phân loại bản ghi thành công";
    //Update type record
    public static final String NO_TYPERECORD = "Không tồn tại phân loại bản ghi";
    public static final String UPDATE_TYPERECORD_SUCCESS = "Cập nhật phân loại bản ghi thành công";
    //Xóa record
    public static final String UNABLE_TO_DELETE_TYPERECORD = "Không thể xóa phân loại bản ghi do có liên kết với ví/bản ghi";
    public static final String DELETE_TYPERECORD_SUCCESS = "Xóa bản ghi thành công";


    //Import excel file
    public static final String IMPORT_EXCEL_FILE_SUCCESS = "Import file thành công";
    public static final String IMPORT_EXCEL_FILE_FAIL = "Import file không thành công";
    public static final String NOT_EXCEL_FILE = "Không phải file excel";
}
