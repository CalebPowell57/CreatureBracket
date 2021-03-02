using System;

namespace CreatureBracket.Models
{
    public class BaseModel : IBaseModel
    {
        public Guid Id { get; set; }

        public void CopyFrom(BaseModel model)
        {
            if (model.GetType() != this.GetType())
            {
                throw new Exception("Type mismatch in \"BaseModel.CopyFrom(BaseModel model)\".");
            }

            foreach (var property in GetType().GetProperties())
            {
                var value = property.GetValue(model);

                property.SetValue(this, value);
            }
        }
    }
}
