library(tidyverse)

download.file("https://raw.githubusercontent.com/dracula/pygments/refs/heads/master/dracula.css",
              "_sass/highlight/dracula.scss"
              )

dr <- read_lines("_sass/highlight/dracula.scss")
dr <- str_replace_all(dr, "  ", " ")
dr <- str_replace(dr, fixed(" .highlight {"), " .highlight pre {")
write_lines(dr, "_sass/highlight/dracula.scss")

sassf <- list.files("_sass/highlight", pattern = ".scss", full.names = TRUE)
sassf <- sassf[!grepl("template", sassf)]
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
  paste0("'", ., "'", collapse = ",")
sassf |>
  basename() |>
  str_remove_all(".scss") %>%
  clipr::write_clip()
