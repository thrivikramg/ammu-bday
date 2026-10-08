import os
from fpdf import FPDF
from fpdf.enums import XPos, YPos

class BirthdayPDF(FPDF):
    def header(self):
        # Elegant pink header bar
        self.set_fill_color(255, 77, 109)
        self.rect(0, 0, 210, 26, 'F')
        
        self.set_font('Helvetica', 'B', 15)
        self.set_text_color(255, 255, 255)
        self.set_y(8)
        self.cell(0, 10, 'SPECIAL BIRTHDAY SURPRISE | 07-10-2026', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')

    def footer(self):
        self.set_y(-18)
        self.set_font('Helvetica', 'I', 10)
        self.set_text_color(140, 140, 140)
        self.cell(0, 10, 'Created with Love by TV for Ammu | Happy Birthday 07-10-2026', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')

def create_birthday_pdf(filename="ammu-special-surprise.pdf"):
    pdf = BirthdayPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # Outer decorative frame
    pdf.set_draw_color(255, 143, 163)
    pdf.set_line_width(1.2)
    pdf.rect(10, 30, 190, 248)
    
    pdf.set_y(34)
    
    # Main Title
    pdf.set_font('Helvetica', 'B', 24)
    pdf.set_text_color(201, 24, 74)
    pdf.cell(0, 12, 'Happy Birthday, Ammu!', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
    
    # Subtitle Date
    pdf.set_font('Helvetica', 'I', 13)
    pdf.set_text_color(255, 77, 109)
    pdf.cell(0, 8, 'October 7, 2026 -- A Day As Special As You', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
    
    pdf.ln(4)
    
    # Featured Couple Photo in Polaroid style container
    img_path = os.path.join(os.path.dirname(__file__), 'img', 'couple.jpg')
    if os.path.exists(img_path):
        # Photo container w=138, h=85, x=36
        pdf.set_fill_color(255, 255, 255)
        pdf.set_draw_color(240, 200, 210)
        pdf.rect(36, pdf.get_y(), 138, 85, 'FD')
        
        photo_y = pdf.get_y() + 4
        pdf.image(img_path, x=40, y=photo_y, w=130, h=73.1)
        pdf.set_y(photo_y + 75)
    else:
        pdf.ln(10)
        
    pdf.ln(6)
    
    # Wish Badge Image if exists
    badge_path = os.path.join(os.path.dirname(__file__), 'img', 'wish_badge.png')
    if os.path.exists(badge_path):
        pdf.image(badge_path, x=65, y=pdf.get_y(), w=80)
        pdf.ln(22)
    else:
        pdf.ln(4)

    # Sweet Heart Message Card
    msg_box_y = pdf.get_y()
    pdf.set_fill_color(255, 242, 245)
    pdf.set_draw_color(255, 179, 193)
    pdf.rect(20, msg_box_y, 170, 56, 'FD')
    
    pdf.set_y(msg_box_y + 5)
    
    pdf.set_font('Helvetica', 'B', 13)
    pdf.set_text_color(43, 45, 66)
    pdf.cell(0, 7, 'My Dearest Ammu,', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
    
    pdf.set_font('Helvetica', '', 10.5)
    pdf.set_text_color(89, 93, 117)
    
    message_lines = [
        "Having you in my life makes every single day brighter and more meaningful.",
        "Your beautiful smile, your playful energy, and your presence complete my entire world.",
        "On this unforgettable day (07-10-2026), I wish you endless laughter, warmth, and success.",
        "May all your wildest dreams and sweetest wishes come true today and forever!"
    ]
    
    for line in message_lines:
        pdf.cell(0, 6.5, line, 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
        
    pdf.ln(8)
    
    # Signature
    pdf.set_font('Helvetica', 'B', 13)
    pdf.set_text_color(201, 24, 74)
    pdf.cell(0, 7, 'With all my love,', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
    pdf.set_font('Helvetica', 'B', 18)
    pdf.cell(0, 9, 'TV', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
    
    pdf.output(filename)
    print(f"Successfully generated {filename}")

if __name__ == "__main__":
    create_birthday_pdf()
