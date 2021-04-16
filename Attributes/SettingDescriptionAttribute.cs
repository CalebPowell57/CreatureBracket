using System;

namespace CreatureBracket.Attributes
{
    [AttributeUsage(AttributeTargets.Property, Inherited = true, AllowMultiple = false)]
    public class SettingDescriptionAttribute : Attribute
    {
        public string Description { get; private set; }

        public SettingDescriptionAttribute (string description) : base ()
        {
            Description = description;
        }
    }
}
