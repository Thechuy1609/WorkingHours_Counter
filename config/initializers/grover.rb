Grover.configure do |config|
  config.options = {
    executable_path: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    format: 'A4',
    margin: '0', 
    print_background: true,
    display_url: 'http://localhost:3000'
  }
end
