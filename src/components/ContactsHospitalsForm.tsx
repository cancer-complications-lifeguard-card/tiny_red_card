import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { EmergencyContact, Hospital, Doctor } from '../types';

interface ContactsHospitalsFormProps {
  emergencyContacts: EmergencyContact[];
  hospitals: Hospital[];
  doctors: Doctor[];
  onEmergencyContactsChange: (contacts: EmergencyContact[]) => void;
  onHospitalsChange: (hospitals: Hospital[]) => void;
  onDoctorsChange: (doctors: Doctor[]) => void;
}

export const ContactsHospitalsForm: React.FC<ContactsHospitalsFormProps> = ({
  emergencyContacts,
  hospitals,
  doctors,
  onEmergencyContactsChange,
  onHospitalsChange,
  onDoctorsChange
}) => {
  const addEmergencyContact = () => {
    onEmergencyContactsChange([...emergencyContacts, { name: '', phone: '', relationship: '' }]);
  };

  const removeEmergencyContact = (index: number) => {
    onEmergencyContactsChange(emergencyContacts.filter((_, i) => i !== index));
  };

  const updateEmergencyContact = (index: number, field: keyof EmergencyContact, value: string) => {
    const updated = emergencyContacts.map((contact, i) => 
      i === index ? { ...contact, [field]: value } : contact
    );
    onEmergencyContactsChange(updated);
  };

  const addHospital = () => {
    onHospitalsChange([...hospitals, { name: '', emergency: '', department: '', address: '', features: '' }]);
  };

  const removeHospital = (index: number) => {
    onHospitalsChange(hospitals.filter((_, i) => i !== index));
  };

  const updateHospital = (index: number, field: keyof Hospital, value: string) => {
    const updated = hospitals.map((hospital, i) => 
      i === index ? { ...hospital, [field]: value } : hospital
    );
    onHospitalsChange(updated);
  };

  const addDoctor = () => {
    onDoctorsChange([...doctors, { name: '', phone: '', department: '', hospital: '' }]);
  };

  const removeDoctor = (index: number) => {
    onDoctorsChange(doctors.filter((_, i) => i !== index));
  };

  const updateDoctor = (index: number, field: keyof Doctor, value: string) => {
    const updated = doctors.map((doctor, i) => 
      i === index ? { ...doctor, [field]: value } : doctor
    );
    onDoctorsChange(updated);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">联系人和医院信息</h2>
        <p className="text-gray-600">请填写紧急联系人、常用医院和医生信息</p>
      </div>

      {/* 紧急联系人 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="text-red-500 mr-2">📞</span>
            紧急联系人
          </h3>
          <button
            onClick={addEmergencyContact}
            className="flex items-center px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            添加
          </button>
        </div>
        <div className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={contact.name}
                onChange={(e) => updateEmergencyContact(index, 'name', e.target.value)}
                placeholder="姓名"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => updateEmergencyContact(index, 'phone', e.target.value)}
                placeholder="电话号码"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                value={contact.relationship}
                onChange={(e) => updateEmergencyContact(index, 'relationship', e.target.value)}
                placeholder="关系"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={() => removeEmergencyContact(index)}
                className="flex items-center justify-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {emergencyContacts.length === 0 && (
            <p className="text-gray-500 text-center py-4">暂无紧急联系人，点击"添加"按钮添加</p>
          )}
        </div>
      </div>

      {/* 医院信息 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="text-red-500 mr-2">🏥</span>
            常用医院
          </h3>
          <button
            onClick={addHospital}
            className="flex items-center px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            添加
          </button>
        </div>
        <div className="space-y-4">
          {hospitals.map((hospital, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  value={hospital.name}
                  onChange={(e) => updateHospital(index, 'name', e.target.value)}
                  placeholder="医院名称"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  value={hospital.emergency}
                  onChange={(e) => updateHospital(index, 'emergency', e.target.value)}
                  placeholder="急诊科电话"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  value={hospital.department}
                  onChange={(e) => updateHospital(index, 'department', e.target.value)}
                  placeholder="相关科室电话"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  value={hospital.features}
                  onChange={(e) => updateHospital(index, 'features', e.target.value)}
                  placeholder="医院特色"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={hospital.address}
                  onChange={(e) => updateHospital(index, 'address', e.target.value)}
                  placeholder="医院地址"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={() => removeHospital(index)}
                  className="flex items-center justify-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {hospitals.length === 0 && (
            <p className="text-gray-500 text-center py-4">暂无医院信息，点击"添加"按钮添加</p>
          )}
        </div>
      </div>

      {/* 医生信息 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="text-red-500 mr-2">👨‍⚕️</span>
            专科医生
          </h3>
          <button
            onClick={addDoctor}
            className="flex items-center px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            添加
          </button>
        </div>
        <div className="space-y-4">
          {doctors.map((doctor, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={doctor.name}
                onChange={(e) => updateDoctor(index, 'name', e.target.value)}
                placeholder="医生姓名"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                value={doctor.phone}
                onChange={(e) => updateDoctor(index, 'phone', e.target.value)}
                placeholder="联系电话"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                value={doctor.department}
                onChange={(e) => updateDoctor(index, 'department', e.target.value)}
                placeholder="科室"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                value={doctor.hospital}
                onChange={(e) => updateDoctor(index, 'hospital', e.target.value)}
                placeholder="所在医院"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={() => removeDoctor(index)}
                className="flex items-center justify-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {doctors.length === 0 && (
            <p className="text-gray-500 text-center py-4">暂无医生信息，点击"添加"按钮添加</p>
          )}
        </div>
      </div>
    </div>
  );
};