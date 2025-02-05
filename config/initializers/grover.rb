Grover.configure do |config|
  config.options = {
    executable_path: '/opt/render/.cache/puppeteer/chrome/linux-132.0.6834.110/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    format: 'A4',
    margin: '0', 
    print_background: true,
    display_url: 'http://localhost:3000'
  }
end
