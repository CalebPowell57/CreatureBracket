using System;

namespace CreatureBracket.Attributes
{
    [AttributeUsage(AttributeTargets.Property, Inherited = true, AllowMultiple = false)]
    public class SettingTitleAttribute : Attribute
    {
        public string Title { get; private set; }

        public SettingTitleAttribute (string title) : base ()
        {
            Title = title;
        }
    }
}
