resmush::resmush_dir("./docs/assets/img/skinspreview", recursive = TRUE, overwrite = TRUE)
xfun::optipng("./docs/assets/img/skinspreview")

lall <- list.files("./docs/assets/img/skinspreview", pattern = ".png", full.names = TRUE)


for (i in lall) {
  int <- i
  f <- png::readPNG(int)
  out <- gsub(".png$", ".webp", int)

  aa <- try(webp::write_webp(f, out), silent = TRUE)
  if (!inherits(aa, "try-error")) {
    cli::cli_alert_success("{.file {out}} created succesfully")
  } else {
    cli::cli_alert_danger("{.file {out}} not generated")
  }
}

# resmush::resmush_dir("./docs/assets/", recursive = TRUE, overwrite = TRUE)

# xfun::optipng("./docs/assets/")
