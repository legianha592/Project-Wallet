package org.example.RestAPI.response.exporter;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.RestAPI.model.Wallet;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class WalletExcelExporterResponse {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = { "Id", "Wallet name", "Created date", "Modified date", "Total amount", "User Id"};
    static String SHEET = "Wallet";

    public static ByteArrayInputStream WalletEntityToExcel(List<Wallet> listWallet){
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SHEET);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
            }

            int rowIdx = 1;
            for (Wallet wallet : listWallet) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(wallet.getId());
                row.createCell(1).setCellValue(wallet.getWallet_name());
                row.createCell(2).setCellValue(wallet.getCreated_date().toString());
                row.createCell(3).setCellValue(wallet.getModified_date().toString());
                row.createCell(4).setCellValue(wallet.getTotal_amount());
                row.createCell(5).setCellValue(wallet.getUser().getId());

            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }
}
