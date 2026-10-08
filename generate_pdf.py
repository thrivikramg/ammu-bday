import os
from fpdf import FPDF
from fpdf.enums import XPos, YPos

class BirthdayLetterPDF(FPDF):
    def header(self):
        # Header bar on top of every page
        self.set_fill_color(255, 77, 109)
        self.rect(0, 0, 210, 22, 'F')
        
        self.set_font('Helvetica', 'B', 13)
        self.set_text_color(255, 255, 255)
        self.set_y(6)
        self.cell(0, 10, 'HAPPY BIRTHDAY BUJJU | 07-10-2026', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')

    def footer(self):
        self.set_y(-16)
        self.set_font('Helvetica', 'I', 9)
        self.set_text_color(140, 140, 140)
        self.cell(0, 10, f'Page {self.page_no()} | With Forever Love -- TV for Ammu', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')

def create_birthday_pdf(filename="ammu-special-surprise.pdf"):
    pdf = BirthdayLetterPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=20)
    
    # Outer decorative frame
    pdf.set_draw_color(255, 143, 163)
    pdf.set_line_width(1.0)
    pdf.rect(10, 26, 190, 254)
    
    pdf.set_y(30)
    
    # Title Header
    pdf.set_font('Helvetica', 'B', 22)
    pdf.set_text_color(201, 24, 74)
    pdf.cell(0, 10, 'Happy Birthday Bujju!', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='C')
    
    pdf.set_font('Helvetica', 'B', 15)
    pdf.set_text_color(255, 77, 109)
    pdf.cell(0, 8, 'Dearest Ammu,', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='L')
    
    pdf.ln(2)
    
    # Featured Couple Photo & Wish Badge
    img_path = os.path.join(os.path.dirname(__file__), 'img', 'couple.jpg')
    badge_path = os.path.join(os.path.dirname(__file__), 'img', 'wish_badge.png')
    
    if os.path.exists(img_path):
        # Photo card frame
        pdf.set_fill_color(255, 255, 255)
        pdf.set_draw_color(240, 200, 210)
        pdf.rect(45, pdf.get_y(), 120, 72, 'FD')
        
        photo_y = pdf.get_y() + 3
        pdf.image(img_path, x=48, y=photo_y, w=114, h=64)
        pdf.set_y(photo_y + 66)
        
    if os.path.exists(badge_path):
        pdf.ln(2)
        pdf.image(badge_path, x=70, y=pdf.get_y(), w=70)
        pdf.ln(18)
    else:
        pdf.ln(4)
        
    # Letter Content
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(45, 45, 60)
    
    paragraphs = [
        "Happy birthday to my favourite person, my queen, my boss baby, my cutie patootie, my hottie, and the one person who can annoy me like nobody else and still be the person I want to run to.",
        "I love ur heart not ur body although u are hot hehehe. The way u care about people, the way u can be soft and kind even when u act all tough, and the way u somehow manage to be both my comfort and my biggest headache. I love ur little habits, ur silly childish side and literally anything about u.",
        "I know our story hasn't always been easy. We've had fights that genuinely hurt me, and the Lalith situation especially stayed with me. Being blocked by u hurt more than I knew how to explain, because suddenly I couldn't even reach the person I wanted to fix things with. And then there have been the confusing feelings around Zoro, the things said about him, and moments when I've been left overthinking what my place in ur life really is. I'm not bringing these up to blame u or spoil ur birthday. I just don't want to pretend our hard moments never happened, because they're part of our story too.",
        "I still think about that park fight and how even after we talked, I wasn't sure if we had really fixed things. Sometimes I wish we could understand each other without getting so hurt first. When u go quiet or walk away, I miss u even while I'm upset. I know I have things to learn too, and I don't expect us to be perfect. I just want us to be honest with each other, choose understanding over ego, and remember that we're on the same side when things get difficult.",
        "Because even with all of that, my love for u hasn't become small. I don't love u only on the easy days or only when everything is going right. I love the real u, and I want to keep learning how to love u better, in ways that make u feel safe, valued, and understood. I want more laughter, more stupid little memories, more food adventures, more moments where we can just be ourselves and not worry about losing each other over a fight.",
        "I can't fit everything I feel into one page, but I hope u never forget this: through the good, the messy, and the moments we still need to figure out -- I love u, Ammu. I always will."
    ]
    
    for p in paragraphs:
        pdf.multi_cell(0, 5.5, p, align='L', new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.ln(3)
        
    pdf.ln(4)
    
    # Signature
    pdf.set_font('Helvetica', 'B', 12)
    pdf.set_text_color(201, 24, 74)
    pdf.cell(0, 6, 'With forever love -- urs TV', 0, new_x=XPos.LMARGIN, new_y=YPos.NEXT, align='R')
    
    pdf.output(filename)
    print(f"Successfully generated {filename}")

if __name__ == "__main__":
    create_birthday_pdf()
