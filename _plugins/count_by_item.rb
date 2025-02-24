# See https://github.com/dieghernan/chulapa/issues/29
# Adapated from @cargocultprogramming work

module Jekyll
    module TagFilters
        def count_by_item(input, property)
            input = input.is_a?(String) ? input.split(',') : input
            counts = Hash.new(0)
            input.flatten.each do |name|
                name = name.strip
                counts[name] += 1
            end
            sorted_counts = counts.sort_by { |property, count| -count }
            sorted_counts.to_h
        end
    end
end
Liquid::Template.register_filter(Jekyll::TagFilters)
