PDFKit.configure do |config|
  config.wkhtmltopdf = Gem.bin_path('wkhtmltopdf-binary', 'wkhtmltopdf')
  config.default_options = {
    page_size: 'A4',
    margin_top: '5mm',
    margin_right: '5mm',
    margin_bottom: '5mm',
    margin_left: '5mm',
    print_media_type: true
  }
end
