#!/usr/bin/env python3
"""Encode the gated landing prototype (us-en) into a DA body fragment.
Usage: python3 -I encode-landing.py <prototype.html> <media-map.json> <out.html> [--meta <_meta.json>]"""
import sys, json, re, html as H
from lxml import html as LH

if len(sys.argv) < 4 or '--help' in sys.argv:
    print(__doc__); sys.exit(0)
proto, mapf, out = sys.argv[1:4]
meta = None
if '--meta' in sys.argv:
    meta = json.load(open(sys.argv[sys.argv.index('--meta') + 1]))
mm = json.load(open(mapf))
by_src = {v: k for k, v in mm.items()}
ORG = 'https://content.da.live/aemcoder/e4399cea/media/us-en/'

def _css2x(sel):
    parts = sel.replace('>', ' > ').split()
    xp, axis = '.', '//'
    for p in parts:
        if p == '>':
            axis = '/'; continue
        tag, *classes = p.split('.')
        cond = ''.join(f"[contains(concat(' ', normalize-space(@class), ' '), ' {c} ')]" for c in classes)
        xp += axis + (tag or '*') + cond
        axis = '//'
    return xp

def _q(el, sel):
    return el.xpath(_css2x(sel))

doc = LH.parse(proto).getroot()
main = _q(doc, 'main')[0]

def esc(s):
    return H.escape(s, quote=False)

def attr(s):
    return H.escape(s, quote=True)

def txt(el):
    return re.sub(r'\s+', ' ', el.text_content()).strip()

def img(el):
    src = el.get('src') or el.get('srcset')
    t = el.get('title')
    tt = f' title="{attr(t)}"' if t else ''
    return f'<img src="{ORG}{by_src[src]}" alt="{attr(el.get("alt") or "")}"{tt}>'

def src_img(source, alt, title=None):
    tt = f' title="{attr(title)}"' if title else ''
    return f'<img src="{ORG}{by_src[source.get("srcset")]}" alt="{attr(alt)}"{tt}>'

def href(a):
    return attr(a.get('href'))

def cta(a):
    tag = 'strong' if 'btn--primary' in a.get('class', '') else 'em'
    return f'<p><{tag}><a href="{href(a)}">{esc(txt(a))}</a></{tag}></p>'

def card_row(card):
    im = _q(card, 'img')[0]
    body = _q(card, '.content-card__body')[0]
    h3 = txt(_q(body, 'h3')[0])
    p = txt(_q(body, 'p')[0])
    label = txt(_q(body, '.has-arrow')[0])
    return (f'<div><div>{img(im)}</div><div><h3>{esc(h3)}</h3><p>{esc(p)}</p>'
            f'<p><a href="{href(card)}">{esc(label)}</a></p></div></div>')

sections = []
h1 = _q(main, 'h1')[0]
sections.append(f'<div><h1>{esc(txt(h1))}</h1></div>')

xf = _q(main, 'section.feature-xf')[0]
src = _q(xf, 'source')[0]
im = _q(xf, 'img')[0]
sections.append(
    '<div><div class="feature-xf">'
    f'<div><div>{src_img(src, im.get("alt"), im.get("title"))}</div></div><div><div>{img(im)}</div></div>'
    f'<div><div><h2>{esc(txt(_q(xf, "h2")[0]))}</h2><p>{esc(txt(_q(xf, "p")[0]))}</p>'
    f'{cta(_q(xf, ".btn-row a")[0])}</div></div>'
    '</div></div>')

tb = _q(main, 'section.teaser-block')[0]
rows = ''.join(card_row(c) for c in _q(tb, '.teaser-grid > a.content-card'))
sections.append(
    f'<div><h2>{esc(txt(_q(tb, "h2")[0]))}</h2>'
    f'<div class="teaser-block">{rows}</div>{cta(_q(tb, ".btn-row a")[0])}</div>')

def carousel_section(sel, variant):
    s = _q(main, sel)[0]
    slides = _q(s, '.carousel__slide > a.content-card')
    rows = ''.join(card_row(c) for c in slides)
    tail = ''.join(cta(a) for a in _q(s, '.btn-row a'))
    sections.append(
        f'<div><h2>{esc(txt(_q(s, "h2")[0]))}</h2>'
        f'<div class="carousel{variant}">{rows}</div>{tail}</div>')

carousel_section('section.promos', '')
ft = _q(main, 'section.features')[0]
rows = ''
for art in _q(ft, 'article.campaign-card'):
    c = _q(art, '.campaign-card__content')[0]
    srcd = _q(art, 'source')[0]
    imm = _q(art, 'img')[0]
    rows += (f'<div><div><h3>{esc(txt(_q(c, "h3")[0]))}</h3><p>{esc(txt(_q(c, "p")[0]))}</p>'
             f'{cta(_q(c, "a.btn")[0])}</div>'
             f'<div>{src_img(srcd, imm.get("alt"))}</div><div>{img(imm)}</div></div>')
sections.append(f'<div><h2>{esc(txt(_q(ft, "h2")[0]))}</h2><div class="features">{rows}</div></div>')

carousel_section('section.more', ' wide')

br = _q(main, 'section.brands')[0]
rows = ''
for a in _q(br, '.brands-grid > a'):
    i = _q(a, 'img')[0]
    name = re.sub(r'\s*logo\s*$', '', i.get('alt'), flags=re.I).strip()
    rows += f'<div><div>{img(i)}</div><div><p><a href="{href(a)}">{esc(name)}</a></p></div></div>'
sections.append(
    f'<div><h2>{esc(txt(_q(br, "h2")[0]))}</h2><div class="brands">{rows}</div>'
    f'{cta(_q(br, ".btn-row a")[0])}</div>')

if meta:
    m = meta['metadata']
    sections.append(
        '<div><div class="metadata">'
        f'<div><div>Title</div><div>{esc(m["title"])}</div></div>'
        f'<div><div>Description</div><div>{esc(m["description"])}</div></div>'
        '<div><div>og:type</div><div>website</div></div>'
        f'<div><div>Image</div><div><img src="{ORG}ko-onexp-meta-image.jpg" alt="coca-cola real magic"></div></div>'
        '</div></div>')

body = '<body>\n<header></header>\n<main>\n' + '\n'.join(sections) + '\n</main>\n<footer></footer>\n</body>\n'
open(out, 'w').write(body)
print(f'wrote {out}: {len(sections)} sections')
