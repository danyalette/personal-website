require 'liquid'
require 'uri'

# Capitalize all words of the input
module FullBaseUrl
  def fullbaseurl(path)
    begin
      url = @context.registers[:site].config['github']['url']
    rescue
      url = @context.registers[:site].config['url'] + @context.registers[:site].config['baseurl']
    ensure
      return url + path
    end
  end
end

Liquid::Template.register_filter(FullBaseUrl)
