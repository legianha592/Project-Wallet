package org.example.RestAPI.response.exporter;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.RestAPI.model.TypeRecord;
import org.example.RestAPI.model.Wallet;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Set;

public class TypeRecordExporterResponse {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs_1 = { "Id", "Record name", "Created date", "Modified date", "Image Url"};
    static String[] HEADERs_2 = { "Id", "Wallet name", "Created date", "Modified date", "Total amount", "User Id"};
    static String[] HEADERs_3 = {"Wallet Id", "TypeRecord_Id"};
    static String[] SHEET = {"TypeRecord", "Wallet", "Wallet_TypeRecord"};
    static List<TypeRecord> classListTypeRecord;
    static List<Wallet> classListWallet;
    static Workbook workbook;
    static ByteArrayOutputStream classOut;

    public static ByteArrayInputStream TypeRecordEntityToExcel(List<TypeRecord> listTypeRecord, List<Wallet> listWallet){
        //class export multiple sheet in excel file
        workbook = new XSSFWorkbook();
        classOut = new ByteArrayOutputStream();
        classListTypeRecord = listTypeRecord;
        classListWallet = listWallet;

        try (ByteArrayOutputStream out = classOut;) {
            //step 1: export type record
            Sheet sheet = workbook.createSheet(SHEET[0]);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs_1.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs_1[col]);
            }

            int rowIdx = 1;
            for (TypeRecord typeRecord : listTypeRecord) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(typeRecord.getId());
                row.createCell(1).setCellValue(typeRecord.getTypeRecord_name());
                row.createCell(2).setCellValue(typeRecord.getCreated_date().toString());
                row.createCell(3).setCellValue(typeRecord.getModified_date().toString());
                row.createCell(4).setCellValue(typeRecord.getImage_url());

            }

            //step 2: export wallet
            WalletEntityToExcel();

            //step 3: export communication table
            TypeRecord_WalletTableToExcel();

            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }

    public static void WalletEntityToExcel(){
        try (ByteArrayOutputStream out = classOut;) {
            Sheet sheet = workbook.createSheet(SHEET[1]);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs_2.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs_2[col]);
            }

            int rowIdx = 1;
            for (Wallet wallet : classListWallet) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(wallet.getId());
                row.createCell(1).setCellValue(wallet.getWallet_name());
                row.createCell(2).setCellValue(wallet.getCreated_date().toString());
                row.createCell(3).setCellValue(wallet.getModified_date().toString());
                row.createCell(4).setCellValue(wallet.getTotal_amount());
                row.createCell(5).setCellValue(wallet.getUser().getId());
            }


        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }

    public static void TypeRecord_WalletTableToExcel(){
        try (ByteArrayOutputStream out = classOut;) {
            Sheet sheet = workbook.createSheet(SHEET[2]);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs_3.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs_3[col]);
            }

            int rowIdx = 1;
            for (Wallet wallet : classListWallet) {
                Set<TypeRecord> setTypeRecord = wallet.getSetTypeRecord();
                for (TypeRecord typeRecord : setTypeRecord){
                    Row row = sheet.createRow(rowIdx++);

                    row.createCell(0).setCellValue(wallet.getId());
                    row.createCell(1).setCellValue(typeRecord.getId());
                }
            }

            workbook.write(out);

        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }
}
