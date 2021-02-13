using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (BackColor == Color.Gray)
                this.BackColor = Color.Black;
            else
                BackColor = Color.Gray;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            MessageBox.Show(File.ReadAllText("tmp.txt").ToString());
        }
    }
}
