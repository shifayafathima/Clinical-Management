package com.project.mydoctorproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mydoctorproject.model.Patient;
import com.project.mydoctorproject.model.Review;
import com.project.mydoctorproject.repo.PatientRepo;

@Service
public class PatientService {
    @Autowired
    private PatientRepo patientRepo;

    public List<Patient> getallPatient(){
        return patientRepo.findAll();
    }

    public Patient savePatient(Patient patient){
        return patientRepo.save(patient);
    }
     public Patient getPatientById(int id) {
        return patientRepo.findById(id).orElse(null);
    }

    public Patient updatePatient(int id,Patient newData){
        return patientRepo.findById(id).map(p->{
            p.setName(newData.getName());
            p.setAge(newData.getAge());
            p.setPhonenumber(newData.getPhonenumber());
            p.setAddress(newData.getAddress());
            return patientRepo.save(p);
        }).orElse(null);
    }

    public String deletePatient(int id){
        if(patientRepo.existsById(id)){
            patientRepo.deleteById(id);
            return "Patient deleted successfully";
        }else{
            return" Patient ID not found";
        }
    }
}
