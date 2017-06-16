require 'liquid'

# Capitalize all words of the input
module RegexReplace
  def regexreplace(input, regex, replacement = '')
    input.to_s.gsub(Regexp.new(regex), replacement.to_s)
  end
end

Liquid::Template.register_filter(RegexReplace)
