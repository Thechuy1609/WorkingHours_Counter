Grover.configure do |config|
  config.options = {
    executable_path: Puppeteer.launch(options: { headless: true }).executable_path,
    format: "A4",
    margin: "0",
    print_background: true,
    display_url: "http://localhost:3000"
  }
end
