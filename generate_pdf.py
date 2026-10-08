import os
from fpdf import FPDF

class BirthdayPDF(FPDF):
    def header(self):
        # Pink header bar
        self.set_fill_color(255, 77, 109)
        self.rect(0, 0, 210, 25, 'F')
        
        self.set_font('Helvetica', 'B', 14)
        self.set_text_color(255, 255, 255)
        self.cell(0, 10, 'SPECIAL BIRTHDAY SURPRISE | 07-10-2026', 0, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-20)
        self.set_font('Helvetica', 'I', 10)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, 'Made with Love by TV for Ammu | Happy Birthday 07-10-2026', 0, 0, 'C')

def create_birthday_pdf(filename="ammu-special-surprise.pdf"):
    pdf = BirthdayPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # Border frame
    pdf.set_draw_color(255, 117, 143)
    pdf.set_line_width(1.5)
    pdf.rect(10, 30, 190, 245)
    
    pdf.ln(10)
    
    # Main Headline
    pdf.set_font('Helvetica', 'B', 26)
    pdf.set_text_color(201, 24, 74)
    pdf.cell(0, 15, 'Happy Birthday, Ammu!', 0, 1, 'C')
    
    # Subtitle
    pdf.set_font('Helvetica', 'I', 14)
    pdf.set_text_color(255, 77, 109)
    pdf.cell(0, 10, 'October 7, 2026 -- A Day As Special As You', 0, 1, 'C')
    
    pdf.ln(8)
    
    # Embed Photo if exists
    img_path = os.path.join(os.path.dirname(__file__), 'img', 'girl2.jpeg')
    if os.path.exists(img_path):
        # Center image (width 70)
        pdf.image(img_path, x=70, y=75, w=70)
        pdf.ln(85)
    else:
        pdf.ln(10)

    # Decorative Box for Message
    pdf.set_fill_color(255, 240, 243)
    pdf.set_draw_color(255, 179, 193)
    pdf.rect(20, pdf.get_y(), 170, 75, 'FD')
    
    current_y = pdf.get_y() + 8
    pdf.set_y(current_y)
    
    pdf.set_font('Helvetica', 'B', 14)
    pdf.set_text_color(43, 45, 66)
    pdf.cell(0, 8, 'My Dearest Ammu,', 0, 1, 'C')
    
    pdf.set_font('Helvetica', '', 11)
    pdf.set_text_color(89, 93, 117)
    
    message_lines = [
        "Having you in my life makes every single day brighter and more meaningful.",
        "Your beautiful smile, your kind heart, and your presence complete my entire world.",
        "On this unforgettable day (07-10-2026), I wish you endless happiness, warmth, and success.",
        "May all your wildest dreams and sweetest wishes come true today and forever!"
    ]
    
    pdf.ln(3)
    for line in message_lines:
        pdf.cell(0, 7, line, 0, 1, 'C')
        
    pdf.ln(12)
    
    # Signature
    pdf.set_font('Helvetica', 'B', 14)
    pdf.set_text_color(201, 24, 74)
    pdf.cell(0, 10, 'With all my love,', 0, 1, 'C')
    pdf.set_font('Helvetica', 'B', 18)
    pdf.cell(0, 10, 'TV', 0, 1, 'C')
    
    pdf.output(filename)
    print(f"Successfully generated {filename}")

if __name__ == "__main__":
    create_birthday_pdf()
