Grover.configure do |config|
  config.options = {
    executable_path: '/usr/bin/google-chrome-stable',
    format: 'A4',
    margin: '0', 
    print_background: true,
    display_url: 'http://localhost:3000'
  }
end
