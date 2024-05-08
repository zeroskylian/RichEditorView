//
//  LocalImageURLSchemeHandler.swift
//
//
//  Created by lianxinbo on 2024/5/8.
//

import Foundation
import WebKit

public class LocalImageURLSchemeHandler: NSObject, WKURLSchemeHandler {
    
    public func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        let request = urlSchemeTask.request
        if let imagePath = request.url?.path, FileManager.default.fileExists(atPath: imagePath) == true, let url = request.url {
            if let imgData = UIImage(contentsOfFile: imagePath)?.pngData() {
                let response = URLResponse(url: url, mimeType: "image/png", expectedContentLength: imgData.count, textEncodingName: nil)
                urlSchemeTask.didReceive(response)
                urlSchemeTask.didReceive(imgData)
                urlSchemeTask.didFinish()
            }
        }
    }
    
    public func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {
        
    }
}

