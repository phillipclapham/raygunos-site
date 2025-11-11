#!/usr/bin/env python3
"""
Convert RAYGUN.md to HTML for raygunos.com framework page
Simple regex-based converter, no external dependencies
"""

import re
from pathlib import Path

def convert_markdown_to_html(md_text):
    """Convert markdown to HTML using regex patterns"""
    html = md_text

    # Convert headers
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)

    # Convert bold/italic
    html = re.sub(r'\*\*\*(.+?)\*\*\*', r'<strong><em>\1</em></strong>', html)
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)
    html = re.sub(r'\*(.+?)\*', r'<em>\1</em>', html)

    # Convert inline code
    html = re.sub(r'`([^`]+)`', r'<code>\1</code>', html)

    # Convert links
    html = re.sub(r'\[([^\]]+)\]\(([^\)]+)\)', r'<a href="\2">\1</a>', html)

    # Convert evidence badges
    html = re.sub(r'\[PROVEN\]', r'<span class="evidence-badge evidence-proven">PROVEN</span>', html)
    html = re.sub(r'\[SUPPORTED\]', r'<span class="evidence-badge evidence-supported">SUPPORTED</span>', html)
    html = re.sub(r'\[LOGICAL EXTENSION\]', r'<span class="evidence-badge evidence-extension">LOGICAL EXTENSION</span>', html)

    # Convert lists (simple approach - ordered and unordered)
    lines = html.split('\n')
    result = []
    in_list = None
    in_table = False

    i = 0
    while i < len(lines):
        line = lines[i]

        # Detect tables
        if '|' in line and not in_table:
            # Start of table
            in_table = True
            result.append('<table>')
            # Parse header row
            cells = [c.strip() for c in line.split('|') if c.strip()]
            result.append('<thead><tr>')
            for cell in cells:
                result.append(f'<th>{cell}</th>')
            result.append('</tr></thead>')
            # Skip separator line
            i += 1
            if i < len(lines) and '|' in lines[i]:
                i += 1
            result.append('<tbody>')
            continue

        elif '|' in line and in_table:
            # Table row
            cells = [c.strip() for c in line.split('|') if c.strip()]
            result.append('<tr>')
            for cell in cells:
                result.append(f'<td>{cell}</td>')
            result.append('</tr>')
            i += 1
            continue

        elif in_table and not '|' in line:
            # End of table
            result.append('</tbody></table>')
            in_table = False

        # Detect lists
        if re.match(r'^\d+\.\s+', line):
            # Ordered list item
            if in_list != 'ol':
                if in_list:
                    result.append(f'</{in_list}>')
                result.append('<ol>')
                in_list = 'ol'
            item = re.sub(r'^\d+\.\s+', '', line)
            result.append(f'<li>{item}</li>')

        elif re.match(r'^-\s+', line):
            # Unordered list item
            if in_list != 'ul':
                if in_list:
                    result.append(f'</{in_list}>')
                result.append('<ul>')
                in_list = 'ul'
            item = re.sub(r'^-\s+', '', line)
            result.append(f'<li>{item}</li>')

        else:
            # Not a list item
            if in_list:
                result.append(f'</{in_list}>')
                in_list = None

            # Convert paragraphs
            if line.strip() and not line.startswith('<'):
                # Check if it's a heading
                if not re.match(r'<h[1-6]>', line):
                    result.append(f'<p>{line}</p>')
                else:
                    result.append(line)
            elif line.strip():
                result.append(line)

        i += 1

    # Close any open list
    if in_list:
        result.append(f'</{in_list}>')
    if in_table:
        result.append('</tbody></table>')

    return '\n'.join(result)

def add_heading_ids(html):
    """Add id attributes to headings for anchor links"""
    def replace_heading(match):
        tag = match.group(1)
        content = match.group(2)

        # Create slug from content (strip HTML tags first)
        clean_content = re.sub(r'<[^>]+>', '', content)
        slug = re.sub(r'[^\w\s-]', '', clean_content.lower())
        slug = re.sub(r'[-\s]+', '-', slug)

        return f'<{tag} id="{slug}">{content}</{tag}>'

    html = re.sub(r'<(h2)>(.*?)</h2>', replace_heading, html)
    html = re.sub(r'<(h3)>(.*?)</h3>', replace_heading, html)
    html = re.sub(r'<(h4)>(.*?)</h4>', replace_heading, html)

    return html

def extract_toc(html):
    """Extract h2 headings for TOC"""
    toc_items = []
    for match in re.finditer(r'<h2 id="([^"]+)">(.+?)</h2>', html):
        slug = match.group(1)
        title = re.sub(r'<[^>]+>', '', match.group(2))  # Strip HTML
        toc_items.append({'slug': slug, 'title': title})
    return toc_items

def convert_raygun_md_to_html(md_path, output_path):
    """Main conversion function"""
    print(f"Reading {md_path}...")
    md_text = Path(md_path).read_text()

    print("Converting markdown to HTML...")
    html = convert_markdown_to_html(md_text)

    print("Adding heading IDs...")
    html = add_heading_ids(html)

    print("Extracting TOC...")
    toc_items = extract_toc(html)

    print(f"Writing HTML to {output_path}...")
    Path(output_path).write_text(html)

    print(f"\n✓ Conversion complete!")
    print(f"✓ {len(html)} characters written")
    print(f"✓ {len(toc_items)} TOC items found")

    # Print TOC items for verification
    print("\nTOC Preview:")
    for item in toc_items[:10]:
        print(f"  - {item['title']}")
    if len(toc_items) > 10:
        print(f"  ... and {len(toc_items) - 10} more")

    return html, toc_items

if __name__ == '__main__':
    source = '/Users/phillipclapham/Documents/raygun-os/RAYGUN.md'
    output = '/Users/phillipclapham/Documents/raygunos-site/framework-content.html'

    convert_raygun_md_to_html(source, output)
