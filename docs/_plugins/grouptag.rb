module Jekyll
    module TagFilters
        def count_by_item(input)
            input = input.is_a?(String) ? input.split(',') : input
            counts = Hash.new(0)
            input.flatten.each do |name|
                name = name.strip
                counts[name] += 1
            end
            sorted_counts = counts.sort_by { |tag, count| -count }
            sorted_counts.to_h
        end
    end
  end
  Liquid::Template.register_filter(Jekyll::TagFilters)