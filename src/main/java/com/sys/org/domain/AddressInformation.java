package com.sys.org.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A AddressInformation.
 */
@Entity
@Table(name = "address_information")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AddressInformation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "landmark")
    private String landmark;

    @ManyToOne
    private RegistrationInformation registrationInformation;

    @ManyToOne
    private AddressType addressType;

    @ManyToOne
    private AddressFor addressFor;

    @ManyToOne
    private Pincode pincode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLandmark() {
        return landmark;
    }

    public AddressInformation landmark(String landmark) {
        this.landmark = landmark;
        return this;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public RegistrationInformation getRegistrationInformation() {
        return registrationInformation;
    }

    public AddressInformation registrationInformation(RegistrationInformation registrationInformation) {
        this.registrationInformation = registrationInformation;
        return this;
    }

    public void setRegistrationInformation(RegistrationInformation registrationInformation) {
        this.registrationInformation = registrationInformation;
    }

    public AddressType getAddressType() {
        return addressType;
    }

    public AddressInformation addressType(AddressType addressType) {
        this.addressType = addressType;
        return this;
    }

    public void setAddressType(AddressType addressType) {
        this.addressType = addressType;
    }

    public AddressFor getAddressFor() {
        return addressFor;
    }

    public AddressInformation addressFor(AddressFor addressFor) {
        this.addressFor = addressFor;
        return this;
    }

    public void setAddressFor(AddressFor addressFor) {
        this.addressFor = addressFor;
    }

    public Pincode getPincode() {
        return pincode;
    }

    public AddressInformation pincode(Pincode pincode) {
        this.pincode = pincode;
        return this;
    }

    public void setPincode(Pincode pincode) {
        this.pincode = pincode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AddressInformation addressInformation = (AddressInformation) o;
        if (addressInformation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), addressInformation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AddressInformation{" +
            "id=" + getId() +
            ", landmark='" + getLandmark() + "'" +
            "}";
    }
}
