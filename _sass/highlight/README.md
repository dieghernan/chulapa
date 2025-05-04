# Highlighters

Rouge highlighters of different sources:

## Default Rouge themes

<https://github.com/rouge-ruby/rouge/tree/master/lib/rouge/themes> Built with
the terminal command:

``` shell
rougify style base16 > base16.scss
rougify style bw > bw.scss
rougify style colorful > colorful.scss
rougify style github > github.scss
rougify style gruvbox > gruvbox.scss
rougify style igorpro > igorpro.scss
rougify style magritte > magritte.scss
rougify style molokai > molokai.scss
rougify style monokai > monokai.scss
rougify style monokai.sublime > monokai.sublime.scss
rougify style pastie > pastie.scss
rougify style thankful_eyes > thankful_eyes.scss
rougify style tulip > tulip.scss
```

Themes included:

-   `base16`
-   `bw`
-   `colorful`
-   `github`
-   `gruvbox`
-   `igorpro`
-   `magritte`
-   `molokai`
-   `monokai`
-   `monokai.sublime`
-   `pastie`
-   `thankful_eyes`
-   `tulip`

## Selected pygment themes

See <https://pygments.org/>.

Build with (see <https://github.com/richleland/pygments-css>):

``` shell
pygmentize -S abap -f html -a .highlight > abap.scss
pygmentize -S algol -f html -a .highlight > algol.scss
pygmentize -S algol_nu -f html -a .highlight > algol_nu.scss
pygmentize -S arduino -f html -a .highlight > arduino.scss
pygmentize -S autumn -f html -a .highlight > autumn.scss
pygmentize -S bw -f html -a .highlight > bw.scss
pygmentize -S borland -f html -a .highlight > borland.scss
pygmentize -S coffee -f html -a .highlight > coffee.scss
pygmentize -S colorful -f html -a .highlight > colorful.scss
pygmentize -S default -f html -a .highlight > default.scss
pygmentize -S emacs -f html -a .highlight > emacs.scss
pygmentize -S friendly_grayscale -f html -a .highlight > friendly_grayscale.scss
pygmentize -S friendly -f html -a .highlight > friendly.scss
pygmentize -S fruity -f html -a .highlight > fruity.scss
pygmentize -S github-dark -f html -a .highlight > github.dark.scss
pygmentize -S gruvbox-dark -f html -a .highlight > gruvbox.dark.scss
pygmentize -S gruvbox-light -f html -a .highlight > gruvbox.light.scss
pygmentize -S igor -f html -a .highlight > igor.scss
pygmentize -S inkpot -f html -a .highlight > inkpot.scss
pygmentize -S lightbulb -f html -a .highlight > lightbulb.scss
pygmentize -S lilypond -f html -a .highlight > lilypond.scss
pygmentize -S lovelace -f html -a .highlight > lovelace.scss
pygmentize -S manni -f html -a .highlight > manni.scss
pygmentize -S material -f html -a .highlight > material.scss
pygmentize -S monokai -f html -a .highlight > monokai.scss
pygmentize -S murphy -f html -a .highlight > murphy.scss
pygmentize -S native -f html -a .highlight > native.scss
pygmentize -S nord-darker -f html -a .highlight > nord.darker.scss
pygmentize -S nord -f html -a .highlight > nord.scss
pygmentize -S one-dark -f html -a .highlight > one.dark.scss
pygmentize -S paraiso-dark -f html -a .highlight > paraiso.dark.scss
pygmentize -S paraiso-light -f html -a .highlight > paraiso.light.scss
pygmentize -S pastie -f html -a .highlight > pastie.scss
pygmentize -S perldoc -f html -a .highlight > perldoc.scss
pygmentize -S rainbow_dash -f html -a .highlight > rainbow_dash.scss
pygmentize -S rrt -f html -a .highlight > rrt.scss
pygmentize -S sas -f html -a .highlight > sas.scss
pygmentize -S solarized-dark -f html -a .highlight > solarized.dark.scss
pygmentize -S solarized-light -f html -a .highlight > solarized.light.scss
pygmentize -S staroffice -f html -a .highlight > staroffice.scss
pygmentize -S stata-dark -f html -a .highlight > stata.dark.scss
pygmentize -S stata-light -f html -a .highlight > stata.light.scss
pygmentize -S tango -f html -a .highlight > tango.scss
pygmentize -S trac -f html -a .highlight > trac.scss
pygmentize -S vim -f html -a .highlight > vim.scss
pygmentize -S vs -f html -a .highlight > vs.scss
pygmentize -S xcode -f html -a .highlight > xcode.scss
pygmentize -S zenburn -f html -a .highlight > zenburn.scss
```

-   `abap`
-   `algol`
-   `algol_nu`
-   `arduino`
-   `autumn`
-   `bw`
-   `borland`
-   `coffee`
-   `colorful`
-   `default`
-   `emacs`
-   `friendly_grayscale`
-   `friendly`
-   `fruity`
-   `github.dark`
-   `gruvbox.dark`
-   `gruvbox.light`
-   `igor`
-   `inkpot`
-   `lightbulb`
-   `lilypond`
-   `lovelace`
-   `manni`
-   `material`
-   `monokai`
-   `murphy`
-   `native`
-   `nord.darker`
-   `nord`
-   `one.dark`
-   `paraiso.dark`
-   `paraiso.light`
-   `pastie`
-   `perldoc`
-   `rainbow_dash`
-   `rrt`
-   `sas`
-   `solarized.dark`
-   `solarized.light`
-   `staroffice`
-   `stata.dark`
-   `stata.light`
-   `tango`
-   `trac`
-   `vim`
-   `vs`
-   `xcode`
-   `zenburn`

## Custom themes

Some themes created by myself:

-   `cran`
-   `cobalt2`
-   `night_owl`
-   `oksolar.dark`
-   `oksolar.light`
-   `panda`
-   `selenized.black`
-   `selenized.dark`
-   `selenized.light`
-   `selenized.white`
-   `skeletor`
-   `stackoverflow.light`
-   `stackoverflow.dark`

## 

## Dracula

From the official repo: <https://github.com/dracula/pygments>

## Theme Builder

-   <https://jwarby.github.io/jekyll-pygments-themes>

## Using Themes Without Jekyll

If you want to use the themes with something other than Jekyll, you may need to
remove or change the CSS style prefix of `.highlight`.

## Links

-   [Jekyll](http://jekyllrb.com/) ([direct link to code highlighting
    documentation](http://jekyllrb.com/docs/templates/#code-snippet-highlighting))
-   [Pygments](http://pygments.org)
