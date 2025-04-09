library(tidyverse)


sassf <- list.files("_sass/highlight", pattern = ".scss", full.names = TRUE)


i <- i

for (i in seq_len(length(sassf))) {
  f <- sassf[i]
  enc <- guess_encoding(f)$encoding[1]

  lns <- read_lines(f, locale = locale(encoding = enc))
  write_lines(lns, f)
  lns2 <- c("---", "---", "", lns)
  bname <- basename(f)

  out <- file.path("./docs/assets/css/highlighter", bname)
  write_lines(lns2, out)
}

sassf |>
  basename() |>
  str_remove_all(".scss") %>%
  paste0("'", ., "'", collapse = ",") |>
  clipr::write_clip()
