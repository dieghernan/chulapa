library(tidyverse)


sassf <- list.files("_sass/highlight", pattern = ".scss", full.names = TRUE)

i <- 1

file.path("./docs/assets/css/highlighter") |>
  list.files(full.names = TRUE) |>
  unlink()

for (i in seq_len(length(sassf))) {
  f <- sassf[i]
  enc <- guess_encoding(f)$encoding[1]

  lns <- read_lines(f, locale = locale(encoding = enc))
  if(!any(str_detect(lns, fixed(".highlight pre")))){
    message(f)
  }
}

for (i in seq_len(length(sassf))) {
  f <- sassf[i]
  enc <- guess_encoding(f)$encoding[1]

  lns <- read_lines(f, locale = locale(encoding = enc))
  if(!any(str_detect(lns, fixed(".highlight table td")))){
    message(f)
  }
}
for (i in seq_len(length(sassf))) {
  f <- sassf[i]
  enc <- guess_encoding(f)$encoding[1]

  lns <- read_lines(f, locale = locale(encoding = enc))
  if(!any(str_detect(lns, fixed(".highlight .hll")))){
    message(f)
  }
}
for (i in seq_len(length(sassf))) {
  f <- sassf[i]
  enc <- guess_encoding(f)$encoding[1]

  lns <- read_lines(f, locale = locale(encoding = enc))

  lns <- str_replace(lns, fixed(".highlight {"), ".highlight pre {")
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

sassf |>
  basename() |>
  str_remove_all(".scss") %>%
  clipr::write_clip()
