package org.example.RestAPI.finalstring;

public class FinalMessage {
    //Đăng kí
    public static final String SIGNUP_SUCCESS = "Sign up successfully";
    public static final String INVALID_USERNAME_LENGTH = "Invalid length of user name (6 - 20)";
    public static final String INVALID_USERNAME_VALUE = "Invalid character in user name";
    public static final String INVALID_PASSWORD_LENGTH = "Invalid length of password (6 - 20)";
    public static final String INVALID_PASSWORD_VALUE = "Invalid character in password";
    public static final String INVALID_NEW_PASSWORD_LENGTH = "Invalid length of new password (6 - 20)";
    public static final String INVALID_NEW_PASSWORD_VALUE = "Invalid character in new password";
    public static final String CHANGE_PASSWORD_SUCCESS = "Change password successfully";
    public static final String USERNAME_EXISTED = "User name is existed";
    public static final String CONFIRM_FAIL = "Password and confirm password are not the same";
    public static final String MANDATORY_FIELD_IS_EMPTY = "Mandatory field is empty";
    //Đăng nhập
    public static final String LOGIN_SUCCESS = "Login successfully";
    public static final String NO_USER = "There is no user";


    //Tạo ví
    public static final String WRONG_PASSWORD = "Wrong password";
    public static final String CREATE_WALLET_SUCCESS = "Create wallet successfully";
    public static final String NO_WALLET = "There is no wallet";
    public static final String INVALID_WALLET_NAME_LENGTH = "Invalid length of wallet (not over 50)";
    public static final String WALLET_NAME_IS_EXISTED = "Wallet name is existed";
    public static final String INVALID_NEW_WALLET_NAME_LENGTH = "Invalid length of wallet's new name (not over 50)";
    //Update ví
    public static final String CHANGE_WALLET_NAME_SUCCESS = "Change wallet's name successfully";
    //Xóa ví
    public static final String DELETE_WALLET_SUCCESS = "Delete wallet successfully";
    //Lấy danh sách ví theo user id
    public static final String GET_LIST_WALLET_SUCCESS = "Get list wallet successfully";



    //Tạo record
    public static final String INVALID_TITLE_RECORD_LENGTH = "Invalid length of record's title";
    public static final String INVALID_NOTE_RECORD_LENGTH = "Invalid length of record's note";
    public static final String CREATE_RECORD_SUCCESS = "Create record successfully";
    //Update record
    public static final String NO_RECORD = "There is no record";
    public static final String UPDATE_RECORD_SUCCESS = "Update record successfully";
    //lấy danh sách record theo wallet id
    public static final String GET_LIST_RECORD_SUCCESS = "Get list record successfully";
    //Xóa record
    public static final String DELETE_RECORD_SUCCESS = "Delete record successfully";


    //lấy danh sách type_record theo wallet id
    public static final String GET_LIST_TYPE_RECORD_SUCCESS = "Get list type record successfully";
    //Tạo type record
    public static final String INVALID_TYPE_RECORD_NAME_LENGTH = "Invalid length of type record's name";
    public static final String TYPE_RECORD_EXISTED = "Type record is existed";
    public static final String CREATE_TYPE_RECORD_SUCCESS = "Create type record successfully";
    //Update type record
    public static final String NO_TYPE_RECORD = "There is no type record";
    public static final String UPDATE_TYPE_RECORD_SUCCESS = "Update type record successfully";
    //Xóa record
    public static final String UNABLE_TO_DELETE_TYPE_RECORD = "Unable to delete type record because there's record/wallet has this type";
    public static final String DELETE_TYPE_RECORD_SUCCESS = "Delete type record successfully";


    //Import excel file
    public static final String IMPORT_EXCEL_FILE_SUCCESS = "Import excel file successfully";
    public static final String IMPORT_EXCEL_FILE_FAIL = "Import excel file fail";
    public static final String NOT_EXCEL_FILE = "It's not excel file";
}
