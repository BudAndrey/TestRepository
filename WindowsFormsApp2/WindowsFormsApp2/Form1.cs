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

namespace WindowsFormsApp2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            using (FileStream fs = File.OpenRead("tmp.txt"))
            {
                progressBar1.Step=progressBar1.Maximum/Convert.ToInt32(fs.Length);
                for (int i = 0; i < fs.Length; i++)
                {
                    label1.Text = progressBar1.Value.ToString();
                    fs.ReadByte();
                    progressBar1.PerformStep();
                    label1.Update();
                    System.Threading.Thread.Sleep(300);
                }
                progressBar1.Value = progressBar1.Maximum;
                label1.Text = progressBar1.Value.ToString();
                label1.Update();
            }
        }

    }
}
